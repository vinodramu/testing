const jQuery = require('../peopleGraph_Import/jquery-3.1.0.min.js');
window.$ = jQuery;
const content = require('../peopleGraph_Import/content.js');
const fs = require('fs');
const path = require('path');
const contentMockHtml = fs.readFileSync(path.resolve(__dirname, 'content.mock.html'), 'utf-8');
const click = 'click';
const attr = 'attr';
const DUMMY_PROFILE = { name: 'dummy' };

beforeAll(() => {
    jQuery(document.body).append(jQuery(contentMockHtml));
});

test('should read skills', () => {
    // Arrange
    let skillSectionExpanded = false;
    spyOn(window.$.fn, click).and.callFake(() => skillSectionExpanded = true);
    spyOn(window.$.fn, attr).and.callFake(() => skillSectionExpanded.toString());

    // Act
    const skills = content.readSkills();

    // Assert
    expect(skillSectionExpanded).toBe(true);
    expect(skills).toBeDefined();
    skills.forEach(skill => expect(skill).toBeDefined());
});
