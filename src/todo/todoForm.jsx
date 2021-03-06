import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Grid from "../template/grid";
import IconButton from "../template/iconButton";
import { changeDescription, search, add, clear } from "./todoAction";

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.keyHendler = this.keyHendler.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.search();
    document.getElementById("description").select();
  }

  componentWillMount() {
    this.props.search();
  }

  keyHendler(e) {
    const { add, clear, search, description } = this.props;
    if (e.key === "Enter") {
      e.shiftKey ? add(description) : this.handleClick();
    } else if (e.key === "Escape") {
      clear();
    }
  }

  render() {
    const { add, search, description } = this.props;
    return (
      <div role="form" className="todoForm">
        <Grid cols="12 9 10">
          <input
            id="description"
            className="form-control"
            placeholder="Adcione uma tarefa"
            onChange={this.props.changeDescription}
            onKeyUp={this.keyHendler}
            value={this.props.description}
          ></input>
        </Grid>

        <Grid cols="12 3 2">
          <IconButton
            style="primary"
            icon="plus"
            onClick={() => add(description)}
          />
          <IconButton style="info" icon="search" onClick={this.handleClick} />
          <IconButton style="default" icon="close" onClick={this.props.clear} />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({ description: state.todo.description });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeDescription, search, add, clear }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoForm);
