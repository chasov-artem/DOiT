import Layout from "@/components/Layout/Layout";
import PostDetails from "@/components/PostDetails/PostDetails";

export default function PostDetailsPage({ params }) {
  return (
    <Layout>
      <PostDetails postId={params.id} />
    </Layout>
  );
}
