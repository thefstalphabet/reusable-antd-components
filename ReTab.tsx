import { Tabs } from "antd";
import { ReactNode } from "react";

interface ITabItems {
  title: string | ReactNode;
  key: string;
  children: any;
  disable?: boolean;
}

function ReTab(props: {
  styles?: any;
  items: ITabItems[];
  onChange: Function;
  tabBarExtraContent?: ReactNode | { left?: ReactNode; right?: ReactNode };
  defaultOpenTab?: string;
  activeKey: string;
}) {
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
      {items.map((item: ITabItems) => {
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
