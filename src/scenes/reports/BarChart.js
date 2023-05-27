import { ResponsiveBar } from "@nivo/bar";

const BarChart = ({ data, index, dashboard }) => {
    return (
        <ResponsiveBar
            data={data}
            keys={["total"]}
            indexBy={index}
            margin={
                dashboard
                    ? { top: 50, right: 20, bottom: 50, left: 50 }
                    : { top: 50, right: 130, bottom: 50, left: 60 }
            }
            padding={0.2}
            groupMode="grouped"
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={{ scheme: "category10" }}
            borderColor={{
                from: "color",
                modifiers: [["darker", 1.6]],
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: index,
                legendPosition: "middle",
                legendOffset: 32,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Total Reports",
                legendPosition: "middle",
                legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
                from: "color",
                modifiers: [["darker", 1.6]],
            }}
            legends={
                dashboard
                    ? []
                    : [
                          {
                              dataFrom: "keys",
                              anchor: "bottom-right",
                              direction: "column",
                              justify: false,
                              translateX: 120,
                              translateY: 0,
                              itemsSpacing: 2,
                              itemWidth: 100,
                              itemHeight: 20,
                              itemDirection: "left-to-right",
                              itemOpacity: 0.85,
                              symbolSize: 20,
                              effects: [
                                  {
                                      on: "hover",
                                      style: {
                                          itemOpacity: 1,
                                      },
                                  },
                              ],
                          },
                      ]
            }
            role="application"
            ariaLabel="Nivo bar chart demo"
            barAriaLabel={function (e) {
                return (
                    e.id +
                    ": " +
                    e.formattedValue +
                    " in country: " +
                    e.indexValue
                );
            }}
        />
    );
};

export default BarChart;
