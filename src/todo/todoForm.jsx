import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Grid from "../template/grid";
import IconButton from "../template/iconButton";
import { changeDescription, search } from "./todoAction";

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.keyHendler = this.keyHendler.bind(this);
  }

  componentWillMount() {
    this.props.search();
  }

  keyHendler(e) {
    if (e.key === "Enter") {
      e.shiftKey ? this.props.handleAdd() : this.props.handleSearch();
    } else if (e.key === "Escape") {
      this.props.handleClear();
    }
  }

  render() {
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
            onClick={this.props.handleAdd}
          />
          <IconButton
            style="info"
            icon="search"
            onClick={this.props.handleSearch}
          />
          <IconButton
            style="default"
            icon="close"
            onClick={this.props.handleClear}
          />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({ description: state.todo.description });
const mapDispatchToProps = dispatch =>
  bindActionCreators({ changeDescription, search }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoForm);
