// import { useDocument } from "@automerge/automerge-repo-react-hooks";
import React from "react";
import { ShoppingList } from "../types";
import { repo } from "../store";
import { useNavigate } from "react-router-dom";
import DefaultLayout from "../layouts/DefaultLayout";
import { Doc } from "@automerge/automerge";

export default function Home() {
  const navigate = useNavigate();

  const [docs, setDocs] = React.useState<
    Map<string, ShoppingList & { id: string }>
  >(new Map());

  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    setLoading(true);

    async function fetchDocs() {
      await Promise.all(
        Object.entries(repo.handles).map(async ([id, docHandle]) => {
          const doc: Doc<ShoppingList> | undefined = await docHandle.doc();

          if (doc === undefined) {
            return;
          }

          return setDocs(docs.set(id, { ...doc, id }));
        }, [])
      );
    }

    fetchDocs().then(() => {
      setLoading(false);
    });
  }, [docs]);

  const handleBtnClick = () => {
    const handle = repo.create<ShoppingList>();

    handle.change((d) => {
      d.createdAt = new Date();
      d.list = [];
    });

    const url = `/lists/${handle.url}`;
    navigate(url);
  };

  return (
    <DefaultLayout>
      <div className="flex py-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4">
            {Array.from(docs.values()).map((doc) => {
              return (
                <li key={doc.id}>
                  <button
                    className="flex-col space-y-2 bg-white shadow hover:shadow-md hover:cursor-pointer"
                    onClick={() => {
                      navigate(`/lists/automerge:${doc.id}`);
                    }}
                  >
                    <div className="p-3">
                      <div className="flex items-center">
                        <strong className="text-gray-700 text-sm">
                          List Id:
                        </strong>
                        <span className="ml-2 text-xs text-wrap">{doc.id}</span>
                      </div>
                      <div className="flex items-center">
                        <strong className="text-gray-700 text-sm">
                          Created At:
                        </strong>
                        <span className="ml-2 text-xs">
                          {new Date(`${doc.createdAt}`)
                            .toISOString()
                            .substring(0, 10)}
                        </span>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        <button
          className="absolute bottom-0 mb-24 p-4 right-4 rounded  shadow hover:shadow-lg bg-white text-slate-800"
          type="button"
          onClick={handleBtnClick}
        >
          <div className="flex items-center">
            <span className="mr-2">Create List</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
        </button>
      </div>
    </DefaultLayout>
  );
}
