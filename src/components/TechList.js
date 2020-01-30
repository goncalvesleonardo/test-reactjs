import React, { Component } from 'react';

import TechItem from './TechItem';

class TechList extends Component {
  // static defaultProps = {
  //  // Define as default props em componentes de classe.
  // };

  // static propTypes = {
  //   // Define as prop types em componentes de classe.
  // }

  state = {
    newTech: '',
    techs: []
  };

  // principais métodos de ciclo de vida do componente

  // Executado assim que o componente aparece em tela.
  componentDidMount() {
    const techs = localStorage.getItem('techs');

    if (techs) {
      this.setState({ techs: JSON.parse(techs) })
    }
  }

  // Executado sempre que houver alterações nas props ou estado.
  componentDidUpdate(prevProps, prevState) {
    // recebe o dados anteriores de prevProps e prevState para futuras comparações.
    // tem acesso aos this.props, this.state

    if (prevState.techs != this.state.techs) {
      localStorage.setItem('techs', JSON.stringify(this.state.techs))
    }
  }

  // Executado quando o componente deixa de existir.
  componentWillUnmount() {}

  handleInputChange = e => {
    this.setState({ newTech: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState({
      techs: [ ... this.state.techs, this.state.newTech],
      newTech: ''
    });
  };

  handleDelete = (tech) => {
    this.setState({ techs: this.state.techs.filter(t => t != tech) })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ul>
          {this.state.techs.map(tech => 
            <TechItem
              key={tech}
              tech={tech}
              onDelete={() => this.handleDelete(tech)}
            /> 
          )}
        </ul>
        <input 
          type="text"
          onChange={this.handleInputChange}
          value={this.state.newTech}
        />
        <button type="submit">Enviar</button>
      </form>
    )
  }
}

export default TechList;
