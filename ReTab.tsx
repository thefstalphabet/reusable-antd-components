import { Tabs } from "antd";
import { IReTabProps, ITabItem } from "./Interfaces/ReComponents.interface";

function ReTab(props: IReTabProps) {
  const { styles, items, onChange, tabBarExtraContent, defaultOpenTab, activeKey } = props;

  const defaultStyles = {
    padding: "0.5rem 1rem",
    backgroundColor: "#ffff",
  };

  return (
    <Tabs
      style={styles ? styles : defaultStyles}
      activeKey={activeKey}
      tabBarExtraContent={tabBarExtraContent}
      defaultActiveKey={defaultOpenTab}
      onChange={(activeKey) => {
        onChange(activeKey);
      }}
    >
      {items.map((item: ITabItem) => {
        const { title, key, children, disable } = item;
        return (
          <Tabs.TabPane key={key} tab={title} disabled={disable}>
            {children}
          </Tabs.TabPane>
        );
      })}
    </Tabs>
  );
}

export default ReTab;
