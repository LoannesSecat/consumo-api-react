class RequestMode {
  modes = {
    test: "test",
    real: "real",
  };

  mode = this.modes.real

  currentMode() {
    return this.mode
  }

  changeMode() {
    this.mode === "real" ?
      this.mode = this.modes.test :
      this.mode = this.modes.real
  }
}

export default new RequestMode()

