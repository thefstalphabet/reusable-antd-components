import { Card } from "antd";
import { IReCardProps } from "./Interfaces/ReComponents.interface";

function ReCard(IReCardProps: IReCardProps) {
  const {
    onClick,
    className,
    children,
    loading,
    extra,
    hoverable,
    size,
    bordered,
    actions,
  } = IReCardProps;
  return (
    <Card
      onClick={onClick}
      loading={loading}
      extra={extra}
      hoverable={hoverable}
      size={size}
      bordered={bordered}
      className={className}
      actions={actions}
    >
      {children}
    </Card>
  );
}

export default ReCard;
