import { useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { StringDecoder } from 'string_decoder';
import { COLUMN_NAMES, ItemTypes } from './Constants';
const style = {
  border: '1px solid gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
};

export const Card = ({
  id,
  name,
  index,
  currentColumnName,
  moveCardHandler,
  setItems,
}: {
  id: number;
  name: string;
  index: number;
  moveCardHandler: Function;
  currentColumnName: string;
  setItems: Function;
}) => {
  const changeItemColumn = (currentItem: any, columnName: string) => {
    setItems((prevState: any) => {
      return prevState.map(
        (e: {
          id: number;
          name: string;
          index: number;
          moveCardHandler: Function;
          currentColumnName: string;
          setItems: Function;
        }) => {
          return {
            ...e,
            column:
              e.name === currentItem.name ? columnName : e.currentColumnName,
          };
        }
      );
    });
  };

  const ref = useRef<HTMLInputElement>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const [, drop] = useDrop({
    accept: 'Our first type',
    hover(item: any, monitor) {
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

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { id },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult();

        if (dropResult) {
          const { currentColumnName }: any = dropResult;
          const { NOT_STARTED, IN_PROGRESS, COMPLETED } = COLUMN_NAMES;
          switch (currentColumnName) {
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
    }),
    [id]
  );

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  const onClickHandler = () => {
    setOpenDialog(!openDialog);
  };

  return (
    <div
      ref={ref}
      className='card movable-item'
      style={{ opacity }}
      onClick={onClickHandler}
    >
      {name}
    </div>
  );
};
