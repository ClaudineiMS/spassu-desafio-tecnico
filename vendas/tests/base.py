from pathlib import Path
from pprint import pformat

from django.conf import settings
from django.test import TestCase


TEST_LOG_INITIALIZED = False


class LoggedTestCase(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()

        cls._inicializar_arquivo_log()
        cls._registrar_inicio_classe()

    @classmethod
    def tearDownClass(cls):
        cls._registrar_fim_classe()
        super().tearDownClass()

        caminho_log = cls._obter_caminho_log()

        if caminho_log.exists():
            print(f'Logs salvos em {caminho_log}')

    @classmethod
    def _obter_caminho_log(cls):
        return Path(settings.TEST_LOG_FILE)

    @classmethod
    def _inicializar_arquivo_log(cls):
        global TEST_LOG_INITIALIZED

        caminho_log = cls._obter_caminho_log()
        caminho_log.parent.mkdir(parents=True, exist_ok=True)

        if TEST_LOG_INITIALIZED:
            return

        caminho_log.write_text('', encoding='utf-8')
        TEST_LOG_INITIALIZED = True

    @classmethod
    def _registrar_inicio_classe(cls):
        conteudo = (
            f'\n{"#" * 80}\n'
            f'INÍCIO DA CLASSE DE TESTE: {cls.__name__}\n'
            f'{"#" * 80}\n'
        )

        cls._salvar_log_classe(conteudo)

    @classmethod
    def _registrar_fim_classe(cls):
        conteudo = (
            f'\n{"#" * 80}\n'
            f'FIM DA CLASSE DE TESTE: {cls.__name__}\n'
            f'{"#" * 80}\n'
        )

        cls._salvar_log_classe(conteudo)

    @classmethod
    def _salvar_log_classe(cls, conteudo):
        caminho_log = cls._obter_caminho_log()

        with caminho_log.open('a', encoding='utf-8') as arquivo:
            arquivo.write(conteudo)

    def run(self, result=None):
        falhas_antes = len(result.failures) if result else 0
        erros_antes = len(result.errors) if result else 0

        retorno = super().run(result)

        if result:
            self._registrar_falhas_e_erros(
                result=result,
                falhas_antes=falhas_antes,
                erros_antes=erros_antes,
            )

        return retorno

    def _registrar_falhas_e_erros(
        self,
        result,
        falhas_antes,
        erros_antes,
    ):
        novas_falhas = result.failures[falhas_antes:]
        novos_erros = result.errors[erros_antes:]

        for teste, traceback_texto in novas_falhas:
            if teste is self:
                self._registrar_teste_com_erro(
                    tipo='FALHA',
                    traceback_texto=traceback_texto,
                )

        for teste, traceback_texto in novos_erros:
            if teste is self:
                self._registrar_teste_com_erro(
                    tipo='ERRO',
                    traceback_texto=traceback_texto,
                )

    def _registrar_teste_com_erro(self, tipo, traceback_texto):
        conteudo = (
            f'\n{"=" * 80}\n'
            f'{tipo} NO TESTE: {self._testMethodName}\n'
            f'{"=" * 80}\n'
            f'{traceback_texto}\n'
        )

        self._salvar_log(conteudo)

        if settings.TEST_DEBUG:
            print(conteudo)

    def exibir_resultado(self, titulo, dados):
        conteudo = (
            f'\n{"=" * 80}\n'
            f'{titulo}\n'
            f'{"=" * 80}\n'
            f'{pformat(dados, sort_dicts=False)}\n'
        )

        self._salvar_log(conteudo)

        if settings.TEST_DEBUG:
            print(conteudo)

    def _salvar_log(self, conteudo):
        caminho_log = self._obter_caminho_log()

        with caminho_log.open('a', encoding='utf-8') as arquivo:
            arquivo.write(conteudo)