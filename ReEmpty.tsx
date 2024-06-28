import { Button, Empty } from "antd";
import { IReEmptyProps } from "./Interfaces/ReComponents.interface";

function ReEmpty(IReEmptyProps: IReEmptyProps) {
  const { title, description, onClick, actionButtonText } = IReEmptyProps;
  return (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{ height: 80 }}
      description={
        <>
          <h4>{title}</h4>
          <p>{description}</p>
        </>
      }
    >
      <Button size="small" onClick={onClick} type="primary">
        {actionButtonText ? actionButtonText : "Create New"}
      </Button>
    </Empty>
  );
}

export default ReEmpty;
