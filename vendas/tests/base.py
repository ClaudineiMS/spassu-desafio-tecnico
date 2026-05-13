from pathlib import Path
from pprint import pformat

from django.conf import settings
from django.test import TestCase


class LoggedTestCase(TestCase):
    @classmethod
    def setUpClass(cls):
        super().setUpClass()

        caminho_log = cls._obter_caminho_log()
        caminho_log.parent.mkdir(parents=True, exist_ok=True)
        caminho_log.write_text('', encoding='utf-8')

    @classmethod
    def tearDownClass(cls):
        super().tearDownClass()

        caminho_log = cls._obter_caminho_log()

        if caminho_log.exists():
            print(f'Logs salvos em {caminho_log}')

    @classmethod
    def _obter_caminho_log(cls):
        return Path(settings.TEST_LOG_FILE)

    def run(self, result=None):
        falhas_antes = len(result.failures) if result else 0
        erros_antes = len(result.errors) if result else 0

        retorno = super().run(result)

        if result:
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

        return retorno

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