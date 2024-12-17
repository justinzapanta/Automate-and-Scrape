from playwright.sync_api import sync_playwright

class Automate:
    def __init__(self, url:str):
        self.url = url
        self.playwright = sync_playwright().start()
        self.browser = self.playwright.chromium.launch(headless=True)
        self.page = self.browser.new_page()
        self.page.goto(self.url)

    def tag_and_class(self, tag:str, class_:str):
        tags = self.page.locator(f'{tag}.{class_}')
        return tags

    def get_child(self, parent, tag:str, class_:str):
        child = parent.locator(f'{tag}.{class_}')
        return child

    def get_text_content(self, instance):
        text_list = []
        for index in range(instance.count()):
            text_list.append(instance.nth(index).text_content().strip())
        return text_list            

    def stop(self):
        self.browser.close()
        self.playwright.stop()

    def get_title(self):
        return self.page.title()