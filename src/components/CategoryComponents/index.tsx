import React, { useEffect, useState } from "react";
import CategoryComponent from "../CategoryComponent";
import "./CategoryComponents.scss";
import Xarrow from "react-xarrows";
const CategoryComponents: React.FC = () => {
  const [items, setItems] = useState<string[][]>([["Categoris"]]);
  const [elements, setElements] = useState<any[]>([]);
  const [isRendered, setIsRendered] = useState(false);
  const handleItemDelete = (index: number, indexRow: number) => {
    const newItems = [...items];
    newItems[indexRow].splice(index, 1);

    setItems(newItems);
  };

  const handleItemCreate = (
    newItemText: string,
    indexes: number[],
    classNameFrom?: string
  ) => {
    const [indexRow, index] = indexes;
    if (indexRow == items.length - 1) {
      setItems([...items, [newItemText]]);
      const classNameTo: string = `element${items.length}${0}`;

      const newElement = {
        from: classNameFrom,
        to: classNameTo,
      };

      setElements([...elements, newElement]);
    } else {
      setItems((items) => {
        let newArrItems: string[][] = items.map((e, i) =>
          i === indexRow + 1 ? [...e, newItemText] : e
        );
        let classNameTo: string;

        newArrItems.forEach((e, i) => {
          if (i === indexRow + 1) classNameTo = `element${i}${e.length - 1}`;
        });

        if (classNameTo!!) {
          const newElement = {
            from: classNameFrom!,
            to: classNameTo,
          };
          console.log(newElement);
          setElements([...elements, newElement]);
        }

        return newArrItems;
      });
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setIsRendered(true);
    }, 1);
    return () => {
      setIsRendered(false);
    };
  }, [elements]);
  return (
    <>
      <div className="ColumnCategoryComponent">
        {items.map((item, indexRow, arr) => {
          return (
            <div className="RowCategoryComponent">
              {item.map((item, index) => {
                return (
                  <CategoryComponent
                    key={index}
                    name={item}
                    onDelete={() => handleItemDelete(index, indexRow)}
                    onCreate={handleItemCreate}
                    indexes={[indexRow, index]}
                    className={`element${indexRow}${index}`}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      {isRendered && elements ? (
        elements.map((e) => (
          <Xarrow
            animateDrawing={true}
            start={e.from}
            end={e.to}
            color="black"
            strokeWidth={1}
            showHead={false}
            path="grid"
            startAnchor={"bottom"}
            endAnchor={"top"}
          />
        ))
      ) : (
        <div></div>
      )}
    </>
  );
};

export default CategoryComponents;
