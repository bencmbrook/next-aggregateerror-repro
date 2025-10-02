import { inspect } from "node:util";

export async function GET(request: Request) {
  const error1 = new Error("Error 1");
  const error2 = new TypeError("Error 2");

  // `AggregateError` doesn't include the `errors` property in the log, even in production. It does in an unpatched Node runtime.
  const myAggregateError = new AggregateError([error1, error2], "Multiple errors:");
  console.error(myAggregateError);

  // This is because the Node's util.inspect is likely patched:
  const formattedAggregateError = inspect(myAggregateError);
  const stringified = `This is the formatted AggregateError from util.inspect, missing the \`[errors]\` section:\n\n${formattedAggregateError}`;
  console.log(stringified);

  return new Response(stringified);
}
