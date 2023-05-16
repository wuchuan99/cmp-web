<script>
import {
  Input,
  Select,
  Cascader,
  Switch,
  Slider,
  TimePicker,
  DatePicker,
  DateTimePicker,
  Upload,
  Rate,
  ColorPicker,
  Transfer
} from "element-ui";
export default {
  functional: true,
  render: (h, ctx) => {
    const props = ctx.props;
    const { type, prop } = props.option;
    const inputOption = {
      ...props.option,
      ...props.option.inputOption,
      ...props.option.itemOption
    };
    const inputMap = {
      input: Input,
      select: Select,
      cascader: Cascader,
      switch: Switch,
      slider: Slider,
      timepicker: TimePicker,
      datepicker: DatePicker,
      datetimepicker: DateTimePicker,
      upload: Upload,
      rate: Rate,
      colorpicker: ColorPicker,
      transfer: Transfer
    };
    switch (type) {
      case "radio":
        return (
          <div>
            {inputOption.options.map(item => {
              return (
                <el-radio
                  {...{ props: item, attrs: item, domProps: item }}
                  value={props.model[prop]}
                  oninput={value => (props.model[prop] = value)}
                >
                  {item.text}
                </el-radio>
              );
            })}
          </div>
        );
      case "select":
        return (
          <el-select
            {...{
              props: inputOption,
              attrs: inputOption,
              domProps: inputOption
            }}
            style="width: 100%"
            value={props.model[prop]}
            oninput={value => (props.model[prop] = value)}
          >
            {inputOption.options.map(item => {
              return (
                <el-option {...{ props: item, attrs: item, domProps: item }} />
              );
            })}
          </el-select>
        );
      default:
        // eslint-disable-next-line no-case-declarations
        const Component = inputMap[type];
        return (
          <Component
            {...{
              props: inputOption,
              attrs: inputOption,
              domProps: inputOption
            }}
            style="width: 100%"
            value={props.model[prop]}
            oninput={value => (props.model[prop] = value)}
          />
        );
    }
  }
};
</script>
<style scoped></style>
