import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const SalesChart = () => {
    const data = [
        { day: '01', thisWeek: 80, lastWeek: 65 },
        { day: '02', thisWeek: 70, lastWeek: 68 },
        { day: '03', thisWeek: 85, lastWeek: 60 },
        { day: '04', thisWeek: 90, lastWeek: 65 },
        { day: '05', thisWeek: 75, lastWeek: 70 },
        { day: '06', thisWeek: 65, lastWeek: 75 },
        { day: '07', thisWeek: 88, lastWeek: 62 },
    ];

    const styles = {
        container: {
            width: '100%',
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '20px'
        },
        header: {
            marginBottom: '20px'
        },
        percentage: {
            color: '#4CAF50',
            fontSize: '14px',
            marginBottom: '8px'
        },
        dateRange: {
            color: '#666',
            fontSize: '14px'
        },
        legend: {
            display: 'flex',
            gap: '32px',
            marginBottom: '16px',
            fontSize: '14px',
            color: '#666'
        },
        legendItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        legendBox: {
            width: '12px',
            height: '12px',
            borderRadius: '2px'
        },
        footer: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            borderTop: '1px solid #eee',
            marginTop: '32px',
            paddingTop: '16px'
        },
        footerTitle: {
            fontWeight: '500'
        }
    };

    const CustomLegend = () => (
        <div style={styles.legend}>
            <div style={styles.legendItem}>
                <div style={{ ...styles.legendBox, backgroundColor: '#2196F3' }}></div>
                <span>Tuần này</span>
            </div>
            <div style={styles.legendItem}>
                <div style={{ ...styles.legendBox, backgroundColor: '#E0E0E0' }}></div>
                <span>Tuần trước</span>
            </div>
        </div>
    );

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.percentage}>↑ 2.1% so với tuần trước</div>
                <div style={styles.dateRange}>Doanh số từ 1-7 Tháng 9, 2024</div>
            </div>

            <CustomLegend />

            <ResponsiveContainer width="100%" height={300}>
                <BarChart
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        display="none"
                    />
                    <Tooltip />
                    <Bar
                        dataKey="thisWeek"
                        fill="#2196F3"
                        radius={[2, 2, 0, 0]}
                        barSize={20}
                    />
                    <Bar
                        dataKey="lastWeek"
                        fill="#E0E0E0"
                        radius={[2, 2, 0, 0]}
                        barSize={20}
                    />
                </BarChart>
            </ResponsiveContainer>

            <div style={styles.footer}>
                <div>
                    <div style={styles.footerTitle}>Doanh số tốt nhất</div>
                </div>
                <div>
                    <div style={styles.footerTitle}>Người bán tốt nhất</div>
                </div>
                <div>
                    <div style={styles.footerTitle}>Hóa đơn</div>
                </div>
            </div>
        </div>
    );
};

export default SalesChart;