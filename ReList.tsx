import { List } from "antd";
import { IReListProps } from "./Interfaces/ReComponents.interface";
import { Link } from "react-router-dom";

export default function ReList(props: IReListProps) {
  const { data, itemLayout, loading, className, bordered } = props;

  return (
    <List
      className={className}
      bordered={bordered}
      style={{
        padding: "1rem",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        borderRadius: "5px",
      }}
      itemLayout={itemLayout}
      dataSource={data}
      loading={loading}
      renderItem={(item, index) => {
        const { href, title, avatar, description, extra, className, actions } =
          item;
        return (
          <List.Item
            key={index}
            actions={actions}
            className={className}
            extra={extra}
          >
            <List.Item.Meta
              title={href ? <Link to={href}>{title}</Link> : title}
              description={description}
              avatar={avatar}
            ></List.Item.Meta>
          </List.Item>
        );
      }}
    />
  );
}
