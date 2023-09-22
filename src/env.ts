const environmentVariableNames = [
  "DB_HOST",
  "DB_PORT",
  "DB_NAME",
  "DB_USER",
  "DB_PASSWORD",
] as const;

export const environmentVariables = environmentVariableNames.reduce(
  (acc, envVarName) => {
    const guessed = process.env[envVarName];
    if (guessed === undefined)
      throw new Error(`Missing ${envVarName} environment variable`);

    acc[envVarName] = guessed;
    return acc;
  },
  {} as { [key in (typeof environmentVariableNames)[number]]: string }
);
