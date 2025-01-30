export enum AnalysisErrorCode {
  InvalidInput = "INVALID_INPUT",
  AIServiceError = "AI_SERVICE_ERROR",
  ValidationFailed = "VALIDATION_FAILED",
  LowConfidence = "LOW_CONFIDENCE"
}

export interface AnalysisError {
  code: AnalysisErrorCode
  message: string
  details?: Record<string, unknown>
}
