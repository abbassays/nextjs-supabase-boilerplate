class Logger {
    private static logColor(
      colorCode: number,
      message: unknown,
      ...optionalParams: unknown[]
    ): void {
      console.log(`\x1b[${colorCode}m%s\x1b[0m`, message, ...optionalParams);
    }
  
    static info(message: unknown, ...optionalParams: unknown[]): void {
      this.logColor(34, message, ...optionalParams); // Blue
    }
  
    static warning(message: unknown, ...optionalParams: unknown[]): void {
      this.logColor(33, message, ...optionalParams); // Yellow
    }
  
    static error(message: unknown, ...optionalParams: unknown[]): void {
      this.logColor(31, message, ...optionalParams); // Red
    }
  
    static success(message: unknown, ...optionalParams: unknown[]): void {
      this.logColor(32, message, ...optionalParams); // Green
    }
  }
  
  export default Logger;
  