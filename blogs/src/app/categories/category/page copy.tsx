import Message from "@/components/schema/schema";
import messageList from "@/components/testData/messages";
import { Eye, Heart } from "lucide-react";
import { catergoriesList } from "@/components/testData/messages";
export default function HomePage({ params }: { params: { category: string } }) {
  const category = params.category;


  const messages: Message[] = messageList();

  return (
    <div className="flex flex-row justify-center items-center w-3/5 flex-wrap  bg-gray-600 gap-2  pb-4 pt-4 min-h-screen h-0vh">
      {messages.map((message, index) => {
        const width = Math.floor(Math.random() * (500 - 300) + 300); // Random width between 300 and 500
        const height = Math.floor(Math.random() * (500 - 300) + 300); // Random height between 300 and 500

        return (
          <div
            key={index}
            className="flex flex-col justify-center items-center gap-2 rounded-2xl bg-gray-400 pb-4 pt-4	"
            style={{ width: `${width}px`, height: `${height}px` }} // Apply random width and height
          >
            <div className="h-8 flex flex-row justify-start items-center gap-2 w-11/12">
              <div className="h-6 w-6 bg-gray-600 rounded-full"></div>
              <p className="text-base text-gray-600">{message.sender}</p>
              <p className="text-xs text-gray-600">{message.timestamp}</p>
            </div>
            <div
              className="h-28 w-11/12 bg-gray-300 rounded-2xl pt-2 pl-4"
              style={{ width: `${width-50}px`, height: `${height-100}px` }} // Apply random width and height
            >
              <p className="text-xl text-gray-600 h-16">{message.title}</p>
              <br className="text-gray-600 w-5/5 " />
              <p className="text-xs text-gray-600">{message.content}</p>
            </div>
            <div className="h-8 w-11/12 bg-gray-300 rounded-2xl pl-4 pr-4 flex flex-row justify-between items-center gap-1">
              <div className="h-5/5 w-5/5 flex flex-row justify-start items-center gap-1">
                <Heart size={18} className="bg-transparent text-gray-600	" />
                <p className="text-xs text-gray-600">{message.replies}</p>
              </div>

              <div className="h-5/5 w-5/5 flex flex-row justify-start items-center gap-1">
                <div className="h-4 w-max pr-2 pl-2  bg-gray-400 rounded">
                  <p className="text-xs text-gray-600">{category}</p>
                </div>
                <Eye size={18} className="bg-transparent text-gray-600	" />
                <p className="text-xs text-gray-600">{message.views}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export async function getStaticParams() {
  const params = catergoriesList.map((post) => ({
    params: { category: post },
  }));

  return {
    params,
  };
}
