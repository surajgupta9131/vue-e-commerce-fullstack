export function showLoginOrSignupError(err: any) {
  const errors = err?.data?.data?.fieldErrors;
  if (typeof err?.data?.message !== "undefined") {
    showError(err?.data?.message);
  } else if (typeof errors !== "undefined") {
    for (const inputFieldName in errors) {
      for (const inputErrorMessage of errors[inputFieldName]) {
        showError(inputErrorMessage);
      }
    }
  }
}

export function apiErrorHandler(err: any) {
  const errors = err?.data?.data?.fieldErrors;
  if (typeof err?.data?.message !== "undefined") {
    showError(err?.data?.message);
  } else if (typeof errors !== "undefined") {
    for (const inputFieldName in errors) {
      for (const inputErrorMessage of errors[inputFieldName]) {
        showError(inputErrorMessage);
      }
    }
  }
}

