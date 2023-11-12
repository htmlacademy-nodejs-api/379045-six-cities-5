import { Command } from './command.interface.js';

export class Help implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._params: string[]): Promise<void> {
    console.info(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            cli.js --<command> [--arguments]
        Команды:
            # выводит номер версии:
            --version

            # печатает этот текст:
            --help

            # импортирует данные из TSV:
            --import <path> <dbUser> <dbPasss> <url> <dbName> <salt>

            # генерирует произвольное количество тестовых данных:
            --generate <n> <path> <url>
    `);
  }
}
