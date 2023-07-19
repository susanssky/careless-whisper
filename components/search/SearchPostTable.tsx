
import Link from "next/link";


interface Post {
  id: number;
  cohort: {
    name: string;
  };
  syllabus: {
    name: string;
  };
  sessionName: string;
  leaderName: string;
}

interface PostTableProps {
  posts: Post[];
}

const PostTable = ({ posts }: PostTableProps) => {
  return (
    <div className="mt-4"> 
      <table className="w-full border-collapse border border-red-500">
        <thead>
          <tr className="bg-red-500 text-white">
            <th className="border border-red-500 py-2 px-4">Syllabus</th>
            <th className="border border-red-500 py-2 px-4">Cohort</th>
            <th className="border border-red-500 py-2 px-4">Session</th>
            <th className="border border-red-500 py-2 px-4">Leader</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-gray-100">
              <td className="border border-red-500 py-2 px-4">
                <Link href={`/dashboard/posts/${post.id}`} className="text-red-500 hover:underline">{post.syllabus?.name}
                </Link>
              </td>
              <td className="border border-red-500 py-2 px-4">{post.cohort?.name}</td>
              <td className="border border-red-500 py-2 px-4">{post.sessionName}</td>
              <td className="border border-red-500 py-2 px-4">{post.leaderName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostTable;