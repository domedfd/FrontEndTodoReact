import React from "react";
import { connect } from "react-redux";
import IconButton from "../template/iconButton";
import { bindActionCreators } from "redux";
import { markAsDone, markAsPending, remove } from "./todoAction";

const TodoList = props => {
  const renderRows = () => {
    const list = props.list || [];
    return list.map(todo => (
      <tr key={todo._id}>
        <td className={todo.done ? "markedAsDone" : ""}>{todo.description}</td>
        <td>
          <IconButton
            hide={todo.done}
            style="success"
            icon="check"
            onClick={() => props.markAsDone(todo)}
          />
          <IconButton
            hide={!todo.done}
            style="warning"
            icon="undo"
            onClick={() => props.markAsPending(todo)}
          />
          <IconButton
            hide={!todo.done}
            style="danger"
            icon="trash-o"
            onClick={() => props.remove(todo)}
          />
        </td>
      </tr>
    ));
  };

  if (props.list.length > 0) {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>Descricao</th>
            <th className="tableActions">acoes</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    );
  } else {
    return (
      <div>
        <center>
          <h2>Voce esta sem tarefas</h2>
        </center>
        <h3>
          <p>Legenda de atalhos</p>
        </h3>
        <ul>
          <li>
            <strong>Enter:</strong> Adiciona uma nova tarefa.
          </li>
          <li>
            <strong>Shift + Enter:</strong> Pesquisa a tarefa informada
          </li>
          <li>
            <strong>ESC:</strong> Limpa e atualiza a tela.
          </li>
        </ul>
      </div>
    );
  }
};

const mapStateToProps = state => ({ list: state.todo.list });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ markAsDone, markAsPending, remove }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList);
