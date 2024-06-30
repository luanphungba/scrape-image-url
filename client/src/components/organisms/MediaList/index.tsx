'use client'
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Input, Select, Row, Col, Pagination, Empty } from 'antd';
import { fetchMedias } from '@/services/media';
import notifyHook from '@/hooks/notify';
const { Search } = Input;
const { Option } = Select;

interface MediaItem {
    id: string;
    created_at: string;
    updated_at: string;
    url: {
        id: string;
        created_at: string;
        updated_at: string;
        url: string;
        isScraped: boolean;
    };
    mediaType: 'image' | 'video';
    mediaUrl: string;
}

const MediaList: React.FC = () => {
    const [results, setResults] = useState<MediaItem[]>([]);
    const [filterType, setFilterType] = useState<string | undefined>(undefined);
    const [searchText, setSearchText] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [limit] = useState<number>(10); // Assuming a fixed limit for simplicity
    const [total, setTotal] = useState<number>(0);
    const { notify } = notifyHook();

    const fetchData = useCallback(async () => {
        const data = await fetchMedias(page, limit, filterType || '', searchText);
        if(data.responseOk){
            setResults(data.results);
            setTotal(data.total);
        } else {
            notify('error', 'Error fetching data');
        }
    }, [page, limit, filterType, searchText]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleFilterChange = useCallback((value: string) => {
        setFilterType(value);
        setPage(1); // Reset to first page on filter change
    }, []);

    const handleSearch = useCallback((value: string) => {
        setSearchText(value);
        setPage(1); // Reset to first page on search
    }, []);

    const handlePageChange = useCallback((page: number) => {
        setPage(page);
    }, []);

    const renderedResults = useMemo(() => (
        results.length > 0 ? (
            results.map((item) => (
                <Col key={item.id} span={8}>
                    {item.mediaType === 'image' ? (
                        <img src={item.mediaUrl} alt="media" style={{ width: '100%', borderRadius: '8px' }} />
                    ) : (
                        <video controls style={{ width: '100%', borderRadius: '8px' }}>
                            <source src={item.mediaUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                </Col>
            ))
        ) : (
            <Col span={24}>
                <Empty description="No Data" />
            </Col>
        )
    ), [results, filterType, searchText, page, limit]);

    return (
        <div>
            <Row gutter={[16, 16]} style={{ marginBottom: '20px' }}>
                <Col span={8}>
                    <Select
                        placeholder="Filter by type"
                        style={{ width: '100%' }}
                        onChange={handleFilterChange}
                        allowClear
                    >
                        <Option value="image">Image</Option>
                        <Option value="video">Video</Option>
                    </Select>
                </Col>
                <Col span={16}>
                    <Search
                        placeholder="Search by URL"
                        onSearch={handleSearch}
                        enterButton
                        style={{ width: '100%' }}
                    />
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                {renderedResults}
            </Row>
            <Row justify="center" style={{ marginTop: '20px' }}>
                <Pagination
                    current={page}
                    pageSize={limit}
                    total={total}
                    onChange={handlePageChange}
                />
            </Row>
        </div>
    );
};

export default MediaList;
