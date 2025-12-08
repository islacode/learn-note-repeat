import { headers } from 'next/headers';
import Layout from '@/components/Layout/Layout';
import { collectIpHeaderValues, appendIpToS3 } from '@/helpers/ip-log';

export const runtime = 'nodejs';

export default async function HomePage() {
  const h = await headers();
  const { primaryIp, allSources } = collectIpHeaderValues(h);
  await appendIpToS3(`${primaryIp} | ${allSources}`);

  return (
    <Layout>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2" aria-label="Articles">
        <article
          className="rounded-2xl border bg-[color:var(--surface)] p-4 shadow
                            border-[color:var(--border)]"
        >
          <h2 className="mb-2 text-lg font-semibold">Lorem ipsum dolor sit amet</h2>
          <p className="mb-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer at pulvinar justo. Sed
            id bibendum metus. In hac habitasse platea dictumst. In non malesuada justo. Aenean eget
            orci at lectus condimentum ultrices a nec arcu.
          </p>
          <p>
            Curabitur laoreet, urna nec molestie tincidunt, nibh urna efficitur lorem, vitae aliquet
            neque velit ut massa. Pellentesque a bibendum tortor.
          </p>
        </article>

        <article
          className="rounded-2xl border bg-[color:var(--surface)] p-4 shadow
                            border-[color:var(--border)]"
        >
          <h2 className="mb-2 text-lg font-semibold">Ut enim ad minim veniam</h2>
          <p className="mb-3">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur.
          </p>
          <p>
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </article>
      </section>
    </Layout>
  );
}
