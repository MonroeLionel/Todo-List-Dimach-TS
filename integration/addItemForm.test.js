describe('addItemForm', () => {
    it('base example , visually looks correct', async () => {
        //API from jest-puppeteer
        await page.goto('http://localhost:6006/iframe.html?id=additem-form-component--add-item-form-base-example&viewMode=story')
        const image = await page.screenshot()
        //API from jest-image-snapshot
        expect(image).toMatchImageSnapshot()
    })

})