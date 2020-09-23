from src.csgo.csgostates import PreCsgoState, InCsgoState
from string import Template


class TextEngine:
    def __init__(self, sentence_dict):
        self.sentence_dict = sentence_dict

    def get_sentences_for_state(self, state, variable_dict):
        # return (long_sentences, short_sentences)
        if type(state) is PreCsgoState:
            return self.set_and_filter_by_variables(self.get_csgo_pre_state_sentences(), variable_dict)
        if type(state) is InCsgoState:
            return self.set_and_filter_by_variables(self.get_csgo_in_state_sentences(), variable_dict)

    def set_and_filter_by_variables(self, sentences, variable_dict):
        return list(filter(lambda x: x is not None, map(lambda x: self.try_substitute(x, variable_dict), sentences[0]))),\
            list(filter(lambda x: x is not None, map(lambda x: self.try_substitute(x, variable_dict), sentences[1])))

    @staticmethod
    def try_substitute(sentence, variable_dict):
        template = Template(sentence)
        try:
            sent = template.substitute(variable_dict)
            print(sent)
            return sent
        except KeyError:
            return None

    def get_csgo_pre_state_sentences(self):
        return self.sentence_dict["csgo"]["shared"]["long"]["pre"]["generic"], \
               self.sentence_dict["csgo"]["shared"]["short"]["pre"]["generic"]

    def get_csgo_in_state_sentences(self):
        return self.sentence_dict["csgo"]["shared"]["long"]["in"]["generic"], \
               self.sentence_dict["csgo"]["shared"]["short"]["in"]["generic"]

    def get_csgo_post_state_sentences(self):
        return self.sentence_dict["csgo"]["shared"]["long"]["post"]["generic"], \
               self.sentence_dict["csgo"]["shared"]["short"]["post"]["generic"]
