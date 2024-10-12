import { Actor, HttpAgent, ActorMethod } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";
import { IDL } from "@dfinity/candid";
import type { Principal } from "@dfinity/principal";

const whoamiCanisterId = process.env.NEXT_PUBLIC_WHOAMI_CANISTER_ID;

// Define the interface for the whoami canister
interface WhoamiService {
  whoami: () => Promise<Principal>;
}

// Define the IDL factory using a type assertion
const whoamiIdlFactory = () => {
  return IDL.Service({ whoami: IDL.Func([], [IDL.Principal], ["query"]) });
};

export const getInternetIdentityUrl = () => {
  if (process.env.NEXT_PUBLIC_DFX_NETWORK === "ic") {
    return `https://${process.env.NEXT_PUBLIC_INTERNET_IDENTITY_CANISTER_ID}.ic0.app`;
  } else {
    return `http://${process.env.NEXT_PUBLIC_INTERNET_IDENTITY_CANISTER_ID}.localhost:4943`;
  }
};

export const login = async(): Promise<string> => {
  const authClient = await AuthClient.create();
  const iiUrl = getInternetIdentityUrl();

  await new Promise<void>((resolve, reject) => {
    authClient.login({
      identityProvider: iiUrl,
      onSuccess: resolve,
      onError: reject,
    });
  });

  const identity = authClient.getIdentity();
  const agent = new HttpAgent({ identity });

  if (process.env.NEXT_PUBLIC_DFX_NETWORK !== "ic") {
    await agent.fetchRootKey();
  }

  const whoamiActor = Actor.createActor<WhoamiService>(whoamiIdlFactory, {
    agent,
    canisterId: whoamiCanisterId!,
  });

  const principal = await whoamiActor.whoami();
  return principal.toText();
};

// Example usage
document.getElementById("loginBtn")?.addEventListener("click", async () => {
  try {
    const principalId = await login();
    document.getElementById("loginStatus")!.innerText = principalId;
  } catch (error) {
    console.error("Login failed:", error);
    document.getElementById("loginStatus")!.innerText = "Login failed";
  }
});