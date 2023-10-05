import React, { useState, ChangeEvent, useRef } from "react";
import "./CategoryComponent.scss";

interface CategoryComponentProps {
  name: string;
  onDelete: () => void;
  onCreate: (
    newItemText: string,
    indexes: number[],
    classNameFrom?: string
  ) => void;
  indexes: number[];
  className?: string;
}

const CategoryComponent: React.FC<CategoryComponentProps> = ({
  name,
  onDelete,
  onCreate,
  indexes,
  className,
}) => {
  const [nameElement, setNameElement] = useState(name);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const [newName, setNewName] = useState("");

  const toggleEditing = () => {
    setIsEditing(true);
  };
  const toggleCreating = () => {
    setIsCreating(true);
  };

  const saveName = () => {
    if (isCreating) {
      onCreate(newName, indexes, className);
      setNewName("");
      setIsCreating(false);
    } else {
      setNameElement(newName);
      setNewName("");
      setIsEditing(false);
    }
  };
  const canselName = () => {
    setIsEditing(false);
    setNewName("");
    setIsCreating(false);
  };
  const handleDeleteClick = () => {
    onDelete();
  };

  return (
    <div className={`BodyCategoryComponent `} id={className}>
      {isEditing || isCreating ? (
        <>
          <div className="BodyInput">
            <input
              type="text"
              className="InputText"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button onClick={saveName} className="ButtonSave">
              {
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="13"
                  height="13"
                  viewBox="0 0 26 26"
                  fill="white"
                >
                  <path d="M 22.566406 4.730469 L 20.773438 3.511719 C 20.277344 3.175781 19.597656 3.304688 19.265625 3.796875 L 10.476563 16.757813 L 6.4375 12.71875 C 6.015625 12.296875 5.328125 12.296875 4.90625 12.71875 L 3.371094 14.253906 C 2.949219 14.675781 2.949219 15.363281 3.371094 15.789063 L 9.582031 22 C 9.929688 22.347656 10.476563 22.613281 10.96875 22.613281 C 11.460938 22.613281 11.957031 22.304688 12.277344 21.839844 L 22.855469 6.234375 C 23.191406 5.742188 23.0625 5.066406 22.566406 4.730469 Z"></path>
                </svg>
              }
            </button>
            <button onClick={canselName} className="ButtonCansel">
              {
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="13"
                  height="13"
                  viewBox="0 0 30 30"
                  fill="white"
                >
                  <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                </svg>
              }
            </button>
          </div>
        </>
      ) : (
        <div className="MainCard">
          <span className="NameSpan">{nameElement}</span>
          {indexes[0] == 0 && indexes[1] == 0 ? (
            <>
              <button onClick={toggleCreating} className="ButtonCreate">
                +
              </button>
            </>
          ) : (
            <>
              <button onClick={toggleCreating} className="ButtonCreate">
                +
              </button>
              <button onClick={toggleEditing} className="ButtonCreate">
                {
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 50 50"
                    fill="white"
                  >
                    <path d="M 46.574219 3.425781 C 45.625 2.476563 44.378906 2 43.132813 2 C 41.886719 2 40.640625 2.476563 39.691406 3.425781 C 39.691406 3.425781 39.621094 3.492188 39.53125 3.585938 C 39.523438 3.59375 39.511719 3.597656 39.503906 3.605469 L 4.300781 38.804688 C 4.179688 38.929688 4.089844 39.082031 4.042969 39.253906 L 2.035156 46.742188 C 1.941406 47.085938 2.039063 47.453125 2.292969 47.707031 C 2.484375 47.898438 2.738281 48 3 48 C 3.085938 48 3.171875 47.988281 3.257813 47.964844 L 10.746094 45.957031 C 10.917969 45.910156 11.070313 45.820313 11.195313 45.695313 L 46.394531 10.5 C 46.40625 10.488281 46.410156 10.472656 46.417969 10.460938 C 46.507813 10.371094 46.570313 10.308594 46.570313 10.308594 C 48.476563 8.40625 48.476563 5.324219 46.574219 3.425781 Z M 45.160156 4.839844 C 46.277344 5.957031 46.277344 7.777344 45.160156 8.894531 C 44.828125 9.222656 44.546875 9.507813 44.304688 9.75 L 40.25 5.695313 C 40.710938 5.234375 41.105469 4.839844 41.105469 4.839844 C 41.644531 4.296875 42.367188 4 43.132813 4 C 43.898438 4 44.617188 4.300781 45.160156 4.839844 Z M 5.605469 41.152344 L 8.847656 44.394531 L 4.414063 45.585938 Z"></path>
                  </svg>
                }
              </button>
              <button onClick={handleDeleteClick} className="ButtonCansel">
                {
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="13"
                    height="13"
                    viewBox="0 0 30 30"
                    fill="white"
                  >
                    <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>
                  </svg>
                }
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryComponent;
