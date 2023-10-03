import ora from "ora";

export default async function runWithLoading(
  action,
  options = {
    text: "loading...",
    succeed: "action succeed!",
    fail: "action failed!",
  }
) {
  const spinner = ora(options.text);
  spinner.start();
  try {
    const rseult = await action();
    spinner.succeed(options.succeed);
    return rseult;
  } catch (err) {
    spinner.fail(options.fail);
    throw new Error(err);
  }
}
