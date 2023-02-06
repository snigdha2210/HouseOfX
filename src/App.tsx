// import React, { useRef, useState } from 'react';
// // import logo from './logo.svg';
import './App.css';
// import { DndProvider, useDrag, useDrop } from 'react-dnd';
// import { HTML5Backend } from 'react-dnd-html5-backend';
// import { tasks, COLUMN_NAMES, ItemTypes } from './Constants';
// import { Column } from './Column';
// // import { Card } from './Card';

// function App() {
//   const [items, setItems] = useState(tasks);

//   const Card = ({
//     id,
//     name,
//     index,
//     currentColumnName,
//     moveCardHandler,
//     setItems,
//   }: {
//     id: number;
//     name: string;
//     index: number;
//     moveCardHandler: Function;
//     currentColumnName: string;
//     setItems: Function;
//   }) => {
//     const changeItemColumn = (currentItem: any, columnName: string) => {
//       setItems((prevState: any) => {
//         return prevState.map(
//           (e: {
//             id: number;
//             name: string;
//             index: number;
//             moveCardHandler: Function;
//             currentColumnName: string;
//             setItems: Function;
//           }) => {
//             return {
//               ...e,
//               column:
//                 e.name === currentItem.name ? columnName : e.currentColumnName,
//             };
//           }
//         );
//       });
//     };

//     const ref = useRef<HTMLInputElement>(null);
//     const [openDialog, setOpenDialog] = useState<boolean>(false);

//     const [, drop] = useDrop({
//       accept: 'Our first type',
//       hover(item: any, monitor) {
//         if (!ref.current) {
//           return;
//         }
//         const dragIndex = item.index;
//         const hoverIndex = index;

//         if (dragIndex === hoverIndex) {
//           return;
//         }

//         const hoverBoundingRect = ref.current?.getBoundingClientRect();

//         const hoverMiddleY =
//           (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

//         const clientOffset = monitor.getClientOffset();

//         const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

//         if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
//           return;
//         }

//         if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
//           return;
//         }

//         moveCardHandler(dragIndex, hoverIndex);

//         item.index = hoverIndex;
//       },
//     });

//     const [{ isDragging }, drag] = useDrag(
//       () => ({
//         type: ItemTypes.CARD,
//         item: { id },
//         end: (item, monitor) => {
//           const dropResult = monitor.getDropResult();

//           if (dropResult) {
//             const { currentColumnName }: any = dropResult;
//             const { NOT_STARTED, IN_PROGRESS, COMPLETED } = COLUMN_NAMES;
//             switch (currentColumnName) {
//               case IN_PROGRESS:
//                 changeItemColumn(item, IN_PROGRESS);
//                 break;
//               case COMPLETED:
//                 changeItemColumn(item, COMPLETED);
//                 break;
//               case NOT_STARTED:
//                 changeItemColumn(item, NOT_STARTED);
//                 break;
//               default:
//                 break;
//             }
//           }
//         },
//         collect: (monitor) => ({
//           isDragging: monitor.isDragging(),
//         }),
//       }),
//       [id]
//     );

//     const opacity = isDragging ? 0.4 : 1;

//     drag(drop(ref));

//     const onClickHandler = () => {
//       setOpenDialog(!openDialog);
//     };

//     return (
//       <div
//         ref={ref}
//         className='card movable-item'
//         style={{ opacity }}
//         onClick={onClickHandler}
//       >
//         {name}
//       </div>
//     );
//   };

//   const moveCardHandler = (dragIndex: number, hoverIndex: number) => {
//     const dragItem = items[dragIndex];

//     if (dragItem) {
//       setItems((prevState) => {
//         const coppiedStateArray = [...prevState];

//         const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);

//         coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

//         return coppiedStateArray;
//       });
//     }
//   };

//   const returnItemsForColumn = (columnName: string) => {
//     return items
//       .filter((item) => item.column === columnName)
//       .map((item, index) => (
//         <Card
//           id={item.id}
//           name={item.name}
//           currentColumnName={item.column}
//           setItems={setItems}
//           index={index}
//           moveCardHandler={moveCardHandler}
//         />
//       ));
//   };

//   const { NOT_STARTED, IN_PROGRESS, COMPLETED } = COLUMN_NAMES;

//   return (
//     <div className='container'>
//       <DndProvider backend={HTML5Backend}>
//         <Column title={NOT_STARTED} className='column do-it-column'>
//           {returnItemsForColumn(NOT_STARTED)}
//         </Column>
//         <Column title={IN_PROGRESS} className='column in-progress-column'>
//           {returnItemsForColumn(IN_PROGRESS)}
//         </Column>

//         <Column title={COMPLETED} className='column done-column'>
//           {returnItemsForColumn(COMPLETED)}
//         </Column>
//       </DndProvider>
//     </div>
//   );
// }

import React, { useEffect, useRef, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { COLUMN_NAMES, ItemTypes, tasks } from './Constants';

import './App.css';
import DialogBox from './DialogBox';

const MovableItem = ({
  name,
  index,
  currentColumnName,
  moveCardHandler,
  setItems,
}: {
  name: string;
  index: number;
  moveCardHandler: Function;
  currentColumnName: string;
  setItems: Function;
}) => {
  const changeItemColumn = (currentItem: any, columnName: string) => {
    setItems((prevState: any) => {
      return prevState.map((e: any) => {
        return {
          ...e,
          column: e.name === currentItem.name ? columnName : e.column,
        };
      });
    });
  };

  const ref = useRef<HTMLInputElement>(null);

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(
      item: {
        id: number;
        name: string;
        index: number;
        moveCardHandler: Function;
        currentColumnName: string;
        setItems: Function;
      },
      monitor
    ) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCardHandler(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { index, name, currentColumnName, type: ItemTypes.CARD },
    end: (item, monitor) => {
      const dropResult: any = monitor.getDropResult();

      if (dropResult) {
        const { name } = dropResult;
        const { NOT_STARTED, IN_PROGRESS, COMPLETED } = COLUMN_NAMES;
        switch (name) {
          case IN_PROGRESS:
            changeItemColumn(item, IN_PROGRESS);
            break;
          case COMPLETED:
            changeItemColumn(item, COMPLETED);
            break;
          case NOT_STARTED:
            changeItemColumn(item, NOT_STARTED);
            break;
          default:
            break;
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const opacity = isDragging ? 0 : 1;

  drag(drop(ref));

  return (
    <div ref={ref} className='movable-item card' style={{ opacity }}>
      {name}
    </div>
  );
};

const Column = ({
  children,
  className,
  title,
}: {
  children: any;
  className: string;
  title: string;
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => ({ name: title }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    canDrop: (item: {
      id: number;
      name: string;
      index: number;
      moveCardHandler: Function;
      currentColumnName: string;
      setItems: Function;
    }) => {
      const { NOT_STARTED, IN_PROGRESS, COMPLETED } = COLUMN_NAMES;
      const { currentColumnName } = item;
      return (
        currentColumnName === title ||
        (currentColumnName === NOT_STARTED && title === IN_PROGRESS) ||
        (currentColumnName === IN_PROGRESS && title === NOT_STARTED) ||
        title === IN_PROGRESS ||
        title === COMPLETED ||
        currentColumnName === COMPLETED
      );
    },
  });

  const getBackgroundColor = () => {
    if (isOver) {
      if (canDrop) {
        return '#5A5A5A';
      } else if (!canDrop) {
        return '#fff';
      }
    } else {
      return '';
    }
  };

  return (
    <div
      ref={drop}
      className={className}
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <p>{title}</p>
      {children}
    </div>
  );
};

export const App = () => {
  const [items, setItems] = useState(tasks);
  const fetchTasks = () => {
    fetch('http://localhost:1234/tasks')
      .then((res) => {
        console.log(res.json());
        return res.json();
      })
      .then((result) => setItems(result))
      .catch(console.log);
  };

  useEffect(() => {
    fetchTasks();
  }, [items]);

  const moveCardHandler = (dragIndex: number, hoverIndex: number) => {
    const dragItem = items[dragIndex];

    if (dragItem) {
      setItems((prevState) => {
        const coppiedStateArray = [...prevState];

        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);

        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

        return coppiedStateArray;
      });
    }
  };

  const returnItemsForColumn = (columnName: string) => {
    return items
      .filter((item) => item.column === columnName)
      .map((item, index) => (
        <div
          onClick={(e) => {
            toggleModalHandler(item.name, e);
          }}
        >
          <MovableItem
            key={item.id}
            name={item.name}
            currentColumnName={item.column}
            setItems={setItems}
            index={index}
            moveCardHandler={moveCardHandler}
          />
        </div>
      ));
  };

  const { NOT_STARTED, IN_PROGRESS, COMPLETED } = COLUMN_NAMES;
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [textDialog, setTextDialog] = useState<string>('');
  const [newTask, setNewTask] = useState<string>('');
  function toggleModalHandler(name: string, e: any) {
    e.preventDefault();
    setTextDialog(name);
    setOpenDialog(!openDialog);
  }

  // function addNewTask() {
  //   let temp = items;
  //   temp.push({
  //     id:'random',
  //     column: '',
  //     name:newTask;
  //   })

  //   fetch('http://localhost:1234/tasks', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(newTask),
  //   }).then(
  //     setItems(...items, {
  //       singledata: {
  //         title: '',
  //         author: '',
  //       },
  //     })
  //   );
  // }

  function onAddTaskHandler(e: any) {
    e.preventDefault();
  }

  return (
    <div className='container'>
      <DndProvider backend={HTML5Backend}>
        {/* <input
          onChange={(e) => {
            onAddTaskHandler(e);
          }}
        ></input>
        <select>
          <option value='Not Started'>Not Started</option>

          <option value='In Progress'>In Progress</option>

          <option value='Completed'>Completed</option>
        </select>
        <button
          onClick={(e) => {
            e.preventDefault();
            addNewTask();
          }}
        >
          +
        </button> */}
        <Column title={NOT_STARTED} className='column do-it-column'>
          {returnItemsForColumn(NOT_STARTED)}
        </Column>
        <Column title={IN_PROGRESS} className='column in-progress-column'>
          {returnItemsForColumn(IN_PROGRESS)}
        </Column>
        <Column title={COMPLETED} className='column done-column'>
          {returnItemsForColumn(COMPLETED)}
        </Column>
        <DialogBox
          isOpen={openDialog}
          toggleModal={toggleModalHandler}
          title={textDialog}
        />
      </DndProvider>
    </div>
  );
};

export default App;
