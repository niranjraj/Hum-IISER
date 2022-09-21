import type { NextPage, GetServerSidePropsContext } from "next";
import { CtxOrReq } from "next-auth/client/_utils";
import { BuiltInProviderType } from "next-auth/providers";
import {
  signIn,
  getSession,
  getProviders,
  getCsrfToken,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";

type Props = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
  csrfToken: string | undefined;
};

const Home: NextPage<Props> = (props) => {
  return (
    <div className="login-container">
      <div className="login-content-wrapper">
        <h2>Sign In to HUM?</h2>

        {props.providers &&
          Object.values(props.providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="google-btn"
                onClick={() => signIn(provider.id)}
              >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const session = await getSession({ req });

  const providers = await getProviders();
  const csrfToken = await getCsrfToken(context);

  if (session) {
    return {
      redirect: { destination: "/account" },
    };
  }

  return {
    props: {
      providers,
      csrfToken,
    },
  };
}

export default Home;
