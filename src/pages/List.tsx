import { useDocument } from "@automerge/automerge-repo-react-hooks";
import React, { useCallback, useState } from "react";
import { useParams } from "react-router-dom";
import { ShoppingList } from "../types";
import { AnyDocumentId, AutomergeUrl } from "@automerge/automerge-repo";
import DefaultLayout from "../layouts/DefaultLayout";
import { repo } from "../store";
import { useNavigate } from "react-router-dom";

export default function List() {
  const { listId } = useParams();
  const [doc, changeDoc] = useDocument<ShoppingList>(listId as AutomergeUrl);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const resetForm = useCallback(() => {
    setName("");
    setQuantity(1);
  }, []);

  const navigate = useNavigate();

  const addItem = React.useCallback(() => {
    if (name.length > 2 && quantity > 0) {
      changeDoc((doc) => {
        doc.list.push({ name, quantity });
      });
    }
  }, [changeDoc, name, quantity]);

  const deleteItem = (id: number) => changeDoc((doc) => doc.list.splice(id, 1));

  return (
    <DefaultLayout>
      <div className="w-full h-full max-w-lg mx-auto">
        <div className="inline-flex mb-4 w-full">
          <input
            type="text"
            required
            value={name}
            className="mr-4 pl-2 outline-0 border-px border-gray-200 w-3/6"
            placeholder="Product"
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (name.length > 2 && quantity > 0) {
                  addItem();
                  resetForm();
                }
              }
            }}
          />
          <input
            type="number"
            value={quantity}
            className="mr-4 pl-2 outline-0 border-px border-gray-200 w-2/6"
            placeholder="Quantity"
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
          <button
            className="p-2 bg-gray-50 text-gray-800 rounded w-auto h-full"
            onClick={() => {
              if (name.length > 2 && quantity > 0) {
                addItem();
                resetForm();
              }
            }}
          >
            Add
          </button>
        </div>
        {doc && doc.list.length > 0 ? (
          <ul className="flex-col space-y-3">
            {doc?.list.map(({ name, quantity }, id) => (
              <li
                className="shadow rounded bg-white border-l-2 border-gray-400 min-h-max p-4"
                key={`${id}-${name}`}
              >
                <div className="inline-flex w-full space-x-4 justify-between items-center">
                  <div className="w-4/6 text-left flex-column space-y-2 items-center text-gray-900 text-sm leading-4">
                    <div className="max-w-full break-words">
                      <strong>Item:</strong>
                      <span> {name}</span>
                    </div>
                    <div className="max-w-full break-words">
                      <strong>Quantity:</strong> {quantity}
                    </div>
                  </div>
                  <div className="flex items-center px-4">
                    <button onClick={() => deleteItem(id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex-col items-center justify-center w-full h-full space-y-4">
            <div className="flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-32 h-32"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                />
              </svg>
            </div>
            <div className="text-xl text-gray-600 leading-8">
              The list is empty. <br />
              <span className="text-sm">Please consider adding new items</span>
            </div>
          </div>
        )}

        <button
          className="absolute bottom-0 right-3 mb-24 rounded p-4 bg-red-500 shadow-sm hover:shadow"
          onClick={() => {
            const id = listId?.split(":")[1];
            if (id !== undefined) {
              repo.delete(id as AnyDocumentId);
            }
            navigate("/");
          }}
        >
          <div className="flex items-center justify-center text-white">
            <span>Delete List</span>
          </div>
        </button>
      </div>
    </DefaultLayout>
  );
}
