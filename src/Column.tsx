// import { debug } from 'console-browserify';
import { useDrop } from 'react-dnd';
import { COLUMN_NAMES } from './Constants';

export const Column = ({
  children,
  className,
  title,
}: {
  children: any;
  className: string;
  title: string;
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'Our first type',
    drop: () => {
      debugger;
      return { name: title };
    },
    collect: (monitor) => {
      debugger;
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      };
    },

    canDrop: (item: { currentColumnName: string }) => {
      //   console.log(item);
      //   console.log('--------------------');

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
        return 'rgb(188,251,255)';
      } else if (!canDrop) {
        return 'rgb(255,188,188)';
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
