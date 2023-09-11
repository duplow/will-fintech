export type TransactionOptions = {
  senderId: string
  receiverId: string
  amount: number
  correlationId?: string
}

export class UserNotFoundException extends Error {}

export class TransferAmountCannotBeNegativeOrZeroException extends Error {}

export class TransferReceiverAndSenderCannotBeTheSameException extends Error {}

export class InsufficientFundsException extends Error {}

export interface MakeTransferUC {
  // TODO: Rename transaction to payload
  execute(transaction: TransactionOptions): Promise<void>
}
