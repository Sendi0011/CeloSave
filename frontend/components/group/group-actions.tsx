"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, ArrowUpRight, ArrowDownLeft, Check, AlertCircle, Sparkles } from "lucide-react"
import { useAccount } from "wagmi"
import {
  useUnifiedApproveToken,
  useUnifiedRotationalDeposit,
  useUnifiedTargetContribute,
  useUnifiedTargetWithdraw,
  useUnifiedFlexibleDeposit,
  useUnifiedFlexibleWithdraw,
  useAccountMode,
} from "@/hooks/useUnifiedContracts"

interface GroupActionsProps {
  groupId: string
  poolAddress: string
  poolType: "rotational" | "target" | "flexible"
  tokenAddress: string
}

export function GroupActions({
  groupId,
  poolAddress,
  poolType,
  tokenAddress,
}: GroupActionsProps) {
  const { address } = useAccount()
  const { isSmartAccountReady } = useAccountMode()
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")
  const [isApproving, setIsApproving] = useState(false)
  const [approved, setApproved] = useState(false)
  const [error, setError] = useState("")

  // Approval hook
  const approveToken = useUnifiedApproveToken(poolAddress, depositAmount)

  // Pool-specific hooks
  const rotationalDeposit = useUnifiedRotationalDeposit(poolAddress)
  const targetContribute = useUnifiedTargetContribute(poolAddress, depositAmount)
  const targetWithdraw = useUnifiedTargetWithdraw(poolAddress)
  const flexibleDeposit = useUnifiedFlexibleDeposit(poolAddress, depositAmount)
  const flexibleWithdraw = useUnifiedFlexibleWithdraw(poolAddress, withdrawAmount)

  // Handle approval + transaction flow
  useEffect(() => {
    if (approveToken.isSuccess) {
      setApproved(true)
      setIsApproving(false)
    }
  }, [approveToken.isSuccess])

  const handleApproveAndDeposit = async () => {
    setError("")
    if (!address) {
      setError("Please connect your wallet first")
      return
    }
    setIsApproving(true)
    if (approveToken.approve) {
      approveToken.approve()
    }
  }

  const handleDeposit = async () => {
    setError("")
    if (!depositAmount || !address) {
      setError("Please enter an amount")
      return
    }

    // If not approved yet, approve first
    if (!approved) {
      await handleApproveAndDeposit()
      return
    }

    // Call appropriate deposit function
    if (poolType === "rotational") {
      rotationalDeposit.deposit?.()
    } else if (poolType === "target") {
      targetContribute.contribute?.()
    } else if (poolType === "flexible") {
      flexibleDeposit.deposit?.()
    }
  }

  const handleWithdraw = async () => {
    setError("")
    if (!withdrawAmount || !address) {
      setError("Please enter an amount")
      return
    }

    if (poolType === "target") {
      targetWithdraw.withdraw?.()
    } else if (poolType === "flexible") {
      flexibleWithdraw.withdraw?.()
    }
  }

  const isDepositLoading =
    poolType === "rotational"
      ? rotationalDeposit.isLoading
      : poolType === "target"
        ? targetContribute.isLoading
        : flexibleDeposit.isLoading

  const isWithdrawLoading =
    poolType === "target"
      ? targetWithdraw.isLoading
      : flexibleWithdraw.isLoading

  const isRotational = poolType === "rotational"
  const isTarget = poolType === "target"
  const isFlexible = poolType === "flexible"

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>

      {isSmartAccountReady && (
        <div className="flex gap-2 p-3 rounded-lg bg-primary/10 text-primary border border-primary/20 mb-4">
          <Sparkles className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm">
            <strong>Gasless transactions enabled!</strong> No gas fees required for your actions.
          </p>
        </div>
      )}

      {error && (
        <div className="flex gap-2 p-3 rounded-lg bg-destructive/10 text-destructive mb-4">
          <AlertCircle className="h-5 w-5 flex-shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-6">
        {/* DEPOSIT SECTION */}
        <div className="space-y-3">
          <Label htmlFor="deposit">
            {isRotational
              ? "Deposit Fixed Amount (ETH)"
              : isTarget
                ? "Contribute Amount (ETH)"
                : "Deposit Amount (ETH)"}
          </Label>
          <Input
            id="deposit"
            type="number"
            step="0.01"
            placeholder="0.5"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            disabled={isDepositLoading || isApproving}
          />
          <p className="text-xs text-muted-foreground">
            {isRotational &&
              "Deposit the fixed pool amount. Same amount for all members."}
            {isTarget && "Contribute any amount toward the target goal."}
            {isFlexible &&
              "Deposit any amount (must meet minimum). Withdraw anytime."}
            {isSmartAccountReady && (
              <span className="text-primary font-semibold"> • Gas fees sponsored</span>
            )}
          </p>
          <Button
            className="w-full bg-primary hover:bg-primary/90"
            onClick={handleDeposit}
            disabled={isDepositLoading || isApproving || !depositAmount || !address}
          >
            {isDepositLoading || isApproving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {approved ? "Depositing..." : "Approving..."}
              </>
            ) : approved ? (
              <>
                <Check className="mr-2 h-4 w-4" />
                {isRotational ? "Deposit" : isTarget ? "Contribute" : "Deposit"}
                {isSmartAccountReady && " (Gasless)"}
              </>
            ) : (
              <>
                <ArrowUpRight className="mr-2 h-4 w-4" />
                {isRotational ? "Deposit" : isTarget ? "Contribute" : "Deposit"}
                {isSmartAccountReady && " (Gasless)"}
              </>
            )}
          </Button>
        </div>

        {/* WITHDRAW SECTION */}
        {!isRotational && (
          <div className="border-t border-border pt-6 space-y-3">
            <Label htmlFor="withdraw">
              {isTarget ? "Withdraw Share (ETH)" : "Withdraw Amount (ETH)"}
            </Label>
            <Input
              id="withdraw"
              type="number"
              step="0.01"
              placeholder="0.5"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              disabled={isWithdrawLoading}
            />
            <p className="text-xs text-muted-foreground">
              {isTarget &&
                "Withdraw after target reached or deadline passed."}
              {isFlexible && "Withdraw anytime. Exit fee will be deducted."}
              {isSmartAccountReady && (
                <span className="text-primary font-semibold"> • Gas fees sponsored</span>
              )}
            </p>
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={handleWithdraw}
              disabled={isWithdrawLoading || !withdrawAmount || !address}
            >
              {isWithdrawLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ArrowDownLeft className="mr-2 h-4 w-4" />
                  Withdraw{isSmartAccountReady && " (Gasless)"}
                </>
              )}
            </Button>
          </div>
        )}

        {isRotational && (
          <div className="border-t border-border pt-6 bg-blue-50 dark:bg-blue-950 p-3 rounded">
            <p className="text-xs text-muted-foreground">
              💡 <strong>Rotational Pool:</strong> No direct withdrawals.
              Payouts are automatic when your turn comes. A relayer triggers
              payouts on schedule.
            </p>
          </div>
        )}

        {/* WALLET INFO */}
        <div className="border-t border-border pt-6">
          <p className="text-xs text-muted-foreground mb-2">Your wallet</p>
          <p className="text-sm font-mono bg-muted/30 p-2 rounded break-all">
            {address || "Not connected"}
          </p>
          {isSmartAccountReady && (
            <p className="text-xs text-primary mt-2">
              ✓ Smart wallet mode active
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}