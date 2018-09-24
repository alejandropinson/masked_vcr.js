interface DataResource {
	endpoint: string;
	properties: Array<string>;
}

const setProperty = (fixture: string, property: string, val: string) => {
	const propertyFinder = new RegExp(`("${property}"\\s*:\\s*")[\\s\\S]*?"`, 'g');
	return fixture.replace(propertyFinder, '$1' + val + '"');
};

export default function maskFixture(fixtureEndpoint: string, fixture: JSON, maskedFixtures: Array<DataResource>) {
	const foundEndpoint = maskedFixtures.find(({ endpoint }) => fixtureEndpoint.includes(endpoint));
	let stringifiedFixture = JSON.stringify(fixture);
	if (foundEndpoint) {
		const { properties } = foundEndpoint;
		properties.forEach((property) => {
			stringifiedFixture = setProperty(stringifiedFixture, property, 'YYY');
		});
		return JSON.parse(stringifiedFixture);
	}
	return fixture;
}
