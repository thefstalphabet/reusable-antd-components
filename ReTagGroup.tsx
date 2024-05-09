import { Tag } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import {
  IReTagGroupProps,
  ITagItem,
} from "./Interfaces/ReComponents.interface";

function ReTagGroup(props: IReTagGroupProps) {
  const { styles, items, setItems, closeIcon } = props;
  const defaultStyles = {};
  const handleRemove = (id: string) => {
    let newItems = items.filter((ele: any) => ele.key !== id);
    console.log(newItems);

    setItems(newItems);
  };

  return (
    <div style={styles ? styles : defaultStyles}>
      {items.map((tag: ITagItem) => {
        const { title, key, color } = tag;
        return (
          <Tag
            closeIcon={closeIcon ? closeIcon : <CloseOutlined />}
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
