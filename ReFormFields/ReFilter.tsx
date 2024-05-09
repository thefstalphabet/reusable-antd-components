import ReCheckBox from "./ReCheckbox";
import ReInput from "./ReInput";
import { ICheckbox, IInputField } from "./Interface";
import { ReactComponent as FilterError } from "../Assets/filter-error.svg";
import loadingPic from "../Assets/Soterius-Loading-Logo.png"
import * as styles from "./FormStyles";
import { Badge } from "antd";

interface IFilterProps {
    reInputProps: IInputField,
    filterItems: ICheckbox[] | [],
    className?: string,
    loading?: boolean,
    handleCheckboxClick?: (arg1: string, arg2: ICheckbox) => void;
    onTextFieldChange: (arg1: string) => void;
}

function ReFilter(props: IFilterProps) {

    const { reInputProps, filterItems, handleCheckboxClick, className, onTextFieldChange, loading } = props

    return (
        <styles.Container className={`form-filter-component ${className ? className : ""}`}>
            <ReInput
                {...reInputProps}
                onChange={() => {
                    onTextFieldChange(reInputProps?.name)}}
            />
            <div className="filter-items-count"><Badge count={filterItems?.length} /></div>
            <div className="checkbox-container">
                {loading ? (
                    <div className="loading-state">
                        <img className="loading-image" src={loadingPic} alt=" " height="30px" />
                        Fetching Data...
                    </div>
                ) : (
                    filterItems?.length ? filterItems.map((ele: ICheckbox, i: number) =>
                        <ReCheckBox
                            key={i}
                            label={ele?.label}
                            name={ele?.name}
                            disable={ele?.disable}
                            handleClick={() => handleCheckboxClick && handleCheckboxClick(reInputProps?.name, ele)}
                        />
                    ) : (
                        <div className="empty-filter">
                            <FilterError />
                            No Data Available
                        </div>
                    )
                )
                }
            </div>
        </styles.Container>
    )
}

export default ReFilter