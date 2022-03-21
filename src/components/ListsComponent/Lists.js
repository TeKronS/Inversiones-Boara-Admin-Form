import { Body, Item, ItemHistory, DeleteButton, DateBox } from "./styles";
import { timeAgo } from "./../../TimeAgo/TimeAgo";
const ACTION_TYPE = {
  edit: "Editar",
  add: "Añadir",
  delete: "Eliminar",
  editSection: "Editar Sección",
  addSection: "Añadir Sección",
  deleteSection: "Eliminar Sección"
};

export const ListArragaments = ({ type, data, clickFunc }) => {
  const cursor = type === ACTION_TYPE.edit ? "pointer" : "default";
  const border = type === ACTION_TYPE.edit ? "black" : "transparent";
  const click = type === ACTION_TYPE.delete ? "none" : "default";
  return (
    <Body>
      {data &&
        Object.keys(data).map((item) => {
          const { titulo, precio } = data[item];
          return (
            <Item
              border={border}
              cursor={cursor}
              onClick={clickFunc}
              id={item}
              key={item}
              click={click}
            >
              <span>{titulo}</span>
              <span>{precio}</span>
              <span>UDS</span>
              {type === ACTION_TYPE.delete && (
                <DeleteButton>
                  <span>X</span>
                </DeleteButton>
              )}
            </Item>
          );
        })}
      <div />
    </Body>
  );
};

export const ListSection = ({ type, object, clickFunc }) => {
  const cursor = type === ACTION_TYPE.editSection ? "pointer" : "default";
  const border = type === ACTION_TYPE.editSection ? "black" : "transparent";
  const click = type === ACTION_TYPE.deleteSection ? "none" : "default";

  return (
    <Body>
      {object &&
        Object.keys(object).map((item) => {
          const amount = Object.keys(object[item]).length;
          return (
            <Item
              border={border}
              cursor={cursor}
              onClick={clickFunc}
              id={item}
              key={item}
              columns={"1fr 92px 30px 30px"}
              click={click}
            >
              <span>{item}</span>
              <span>Cantidad:</span>
              <span>{`${amount}`}</span>
              {type === ACTION_TYPE.deleteSection && (
                <DeleteButton>
                  <span>X</span>
                </DeleteButton>
              )}
            </Item>
          );
        })}
      <div />
    </Body>
  );
};

export const ListHistory = ({ type, object, clickFunc }) => {
  const cursor = type === ACTION_TYPE.edit ? "pointer" : "default";
  const border = type === ACTION_TYPE.edit ? "black" : "transparent";
  const click = type === ACTION_TYPE.delete ? "none" : "default";

  return (
    <Body>
      {object &&
        Object.keys(object).map((item) => {
          const { historia, fecha } = object[item];
          const timestamp = fecha.seconds * 1000;
          const { dateTime, timeago } = timeAgo(timestamp);

          return (
            <ItemHistory
              border={border}
              cursor={cursor}
              onClick={clickFunc}
              id={item}
              key={item}
              click={click}
            >
              <span>{historia}</span>
              <DateBox>
                <span>{dateTime}</span>
                <span>
                  <time datatime={dateTime}>{timeago}</time>
                </span>
                {type === ACTION_TYPE.delete && (
                  <DeleteButton>
                    <span>X</span>
                  </DeleteButton>
                )}
              </DateBox>
            </ItemHistory>
          );
        })}
      <div />
    </Body>
  );
};
