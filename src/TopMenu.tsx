import React from 'react';
import { Tag, Card, Row, Col, Select, Input, Divider } from 'antd';
import { ITopMenuProps, ITopTagsProps } from './types';

const { Search } = Input;

const { Option } = Select;
const { CheckableTag } = Tag;


type TopTagsState = {
  selectedTags: string[]
}

class TopTags extends React.Component<ITopTagsProps> {
  state: TopTagsState;

  constructor(props: ITopTagsProps) {
    super(props);
    this.state = {
      selectedTags: [],
    };
  }

  handleChange(tag: string, checked: boolean) {
    const { selectedTags } = this.state;
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    this.setState({ selectedTags: nextSelectedTags });

    this.props.handlePostsByTags(nextSelectedTags);
  }

  render() {
    const { selectedTags } = this.state;
    return (
      <React.Fragment>
        {this.props.tags.map( (tag: string) => (
          <CheckableTag key={tag} checked={selectedTags.indexOf(tag) > -1} onChange={checked => this.handleChange(tag, checked)}>
            {tag}
          </CheckableTag>
        ))}
      </React.Fragment>
    );
  }
}


class TopMenu extends React.Component<ITopMenuProps> {

  render() {
    return(
       <Card>
         <Row type="flex" justify="center" align="top">
         <Search
           placeholder="input search text"
           enterButton="Search"
           onSearch={this.props.handleSearchPosts}
           size="small"
           style={{width: '80%'}}
         />
         </Row>
         <Divider/>
         <Row type="flex" justify="center" align="top">

           <Col lg={12} md={12} sm={24}>
             <h5 style={{ marginRight: 8, display: 'inline' }}>Tags:</h5>
             <TopTags handlePostsByTags={this.props.handlePostsByTags} tags={this.props.tags} />
           </Col>

           <Col lg={12} md={12} sm={24} style={{textAlign: 'right'}}>
             <h5 style={{ marginRight: 8, display: 'inline' }}>Filter by:</h5>
             <Select defaultValue="all" size="small" style={{ width: 120 }} onChange={this.props.handleFilterPosts }>
               <Option value="all">All Time</Option>
               <Option value="today">Today</Option>
               <Option value="yesterday">Yesterday</Option>
               <Option value="week">This Week</Option>
               <Option value="month">This Month</Option>
             </Select>
           </Col>

         </Row>
       </Card>

    );
  }
}


export default TopMenu;
