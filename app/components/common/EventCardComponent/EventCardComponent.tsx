/* eslint-disable @typescript-eslint/no-explicit-any */
import EventCardListComponent from "./EventCardListComponent";
import EventCardGridComponent from "./EventCardGridComponent";

export interface EventCardComponentProps {
  className?: string;
  event: any;
  variant: "grid" | "list";
  onClick?: () => void;
  onDelete?: (id?: any) => void;
  showActions?: "event" | "booking" | "";
  restrictCardClick?: boolean
}

const EventCardComponent = (props: EventCardComponentProps) => {
  const {
    className,
    event,
    variant = "grid",
    onClick,
    onDelete,
    showActions,
    restrictCardClick
  } = props;

  return (variant === "list") ?
    <EventCardListComponent
      className={className}
      event={event}
      onClick={onClick}
      onDelete={onDelete}
      showActions={showActions}
      restrictCardClick={restrictCardClick}
    /> :
    <EventCardGridComponent
      className={className}
      event={event}
      onClick={onClick}
      onDelete={onDelete}
      showActions={showActions}
      restrictCardClick={restrictCardClick}
    />
}

export default EventCardComponent;