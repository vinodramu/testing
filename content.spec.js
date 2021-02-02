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

test('should read publications', () => {
    // Arrange
    let publicationSectionExpanded = false;
    spyOn(window.$.fn, click).and.callFake(() => publicationSectionExpanded = true);
    spyOn(window.$.fn, attr).and.callFake(() => publicationSectionExpanded.toString());

    // Act
    const publications = content.readPublications(DUMMY_PROFILE);

    // Assert
    expect(publicationSectionExpanded).toBe(true);
    expect(publications).toBeDefined();
    expect(publications.length).toBeGreaterThan(0);

    expect(publications[0].name).toBeDefined();
    expect(publications[0].date).toBeDefined();
    expect(publications[0].publisher).toBeDefined();
    expect(publications[0].description).toBeDefined();
    expect(publications[0].url).toBeDefined();
    expect(publications[0].id).toBeDefined();

    expect(publications[0].authors).toBeDefined();
    expect(publications[0].authors.length).toBeGreaterThan(0);
    expect(publications[0].authors[0]).toBe(DUMMY_PROFILE.name);
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
