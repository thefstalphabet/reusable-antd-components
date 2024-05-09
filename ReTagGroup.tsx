import { Tag } from "antd";
import { ReactNode } from "react";
import { CloseOutlined } from "@ant-design/icons";

interface ITabItems {
  title: string;
  key: string;
  color?: string;
}

interface IProps {
  styles?: any;
  items: ITabItems[];
  setItems: Function;
  closeIcon?: ReactNode;
}

function ReTagGroup(props: IProps) {
  const { styles, items, setItems, closeIcon } = props;

  const defaultStyles = {};

  const handleRemove = (id: string) => {
    let newItems = items.filter((ele: any) => ele.key !== id)
    console.log(newItems);
    
    setItems(newItems)
  };

  return (
    <div style={styles ? styles : defaultStyles}>
      {items.map((tag: ITabItems) => {
        const { title, key, color } = tag;
        return (
          <Tag
            closeIcon={
              closeIcon ? closeIcon : <CloseOutlined />
            }
            closable={setItems ? true : false}
            onClose={() => {
              handleRemove(key);
            }}
            color={color}
            key={key}
          >
            {title}
          </Tag>
        );
      })}
    </div>
  );
}

export default ReTagGroup;
