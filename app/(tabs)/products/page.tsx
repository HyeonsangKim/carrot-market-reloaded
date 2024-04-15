import ListProduct from "@/components/list-product";
import ProductList from "@/components/product-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Prisma } from "@prisma/client";
import { unstable_cache as nextCahce, revalidatePath } from "next/cache";
import Link from "next/link";

const getCachedProducts = nextCahce(getInitialProducts, ["home-products"]);

async function getInitialProducts() {
  console.log("ho");

  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    // take: 3,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}

export const metadata = {
  title: "Product",
};

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

// export const dynamic = "force-dynamic";
export const revalidate = 60;

export default async function Products() {
  const initialProducts = await getInitialProducts();
  const revalidate = async () => {
    "use server";
    revalidatePath("/products");
  };
  return (
    <div>
      <Link href="/products/recent">Recent product</Link>
      <form action={revalidate}>
        <button>revalidate</button>
      </form>
      <ProductList initialProducts={initialProducts} />

      <Link
        href={"/products/add"}
        className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed
      bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
