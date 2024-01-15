import { useCustomFetch } from "~/composables/useCustomFetch";

export default () => {
  // const config = useRuntimeConfig();
  return {
    getDesignTypes(email: string) {
      return useFetch("/groups/109449033566651559/subscribers", {
        baseURL: "https://connect.mailerlite.com",
        body: { email, resubscribe: false, autoresponders: true },
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiOGExYTQyY2ExMTU2OGY4OGQxOWNkMjY5ZWMwZTBhMDI1NzFlNWZiZTA5NTFmZWZjYmMwNmQwZDQ2NmUyYmJlY2Y4Y2IyZDgyNDg1YTdlYTEiLCJpYXQiOjE3MDUzMjcxNDIuNDMzMzc1LCJuYmYiOjE3MDUzMjcxNDIuNDMzMzc3LCJleHAiOjQ4NjEwMDA3NDIuNDI4OTQyLCJzdWIiOiI0OTkyMDkiLCJzY29wZXMiOltdfQ.rrraA4gbJmqLY0FpWLGo92gdzlSp8xRqXtaRd3ZNvQQoJPEa17UWxKbkyLM1fOlWcxJVRHimyhW7up3iE6UmOIGcYP3TX5OLwMDZ3CP_-FfFExkREPKVxzP3C0h9NGXqVW9vChcq2hZO5B_eMTrzFdTV9wantheQUNzvQLOfer5TzimmBXg7dOFS9sxz8miLBA4QDuS3Ojg-tuew1AD-ihaLE5Y1qWzVt656vXdkZySMfaPFPdjhRIDEIUtTXciuhwRsc7WDEb_VK1AuaANw8ja_fMQvgWCrrvPN3AyGeyKqEFccDRyGAYiJ6QJCn_yFrzT49KZHYkGp8UlSB8DgVNZWwnjzqS6X6FfW9b_ZOxYTT7GdhwP0FgWUoZDzNWMHw2lEqNNK7vWXvN7UOOt7ksrEsNMFhT9OaReCq-9LB8WXqGdDc4zjrv649TYGHXx0oW4Zl-fRmUL8Ix_vutmUYhvpz-AhXBrmmwJ6mdjgaQ4uy1RQboMzzltFTkEnB2NLCGdDHHFM2krdKFaciMmI8o8zhqQpW-KPBLH5qpYRFrjijZi0eh1rlVzKeRKLN9vX_acnWsvqU4b8gOeUSnTM-M1UNk7DuZb5Tzet_JSYCXRuPzInHHeY199GW1sz-1Ublb4_SlvXB-tYM6Aq1Q3ZdEAH1eAWs7donM3WjG1cqlo", // config.public.mailLiteKey,
        },
      });
    },
  };
};
